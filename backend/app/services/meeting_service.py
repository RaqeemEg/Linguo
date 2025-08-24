from app.models.participant import Participant, ParticipantRole, ParticipantStatus
from app.repositories.meeting_repository import MeetingRepository
from app.repositories.participant_repository import ParticipantRepository
from app.repositories.user_repository import UserRepository
from app.models.meeting import MeetingStatus
from sqlalchemy.orm import Session
from app.utils.to_dict_helper import meeting_to_dict, participant_to_dict


class MeetingService:
    def __init__(self, db: Session):
        self.db = db
        self.meeting_repo = MeetingRepository(db)
        self.user_repo = UserRepository(db)
        self.participant_repo = ParticipantRepository(db)

    def create_meeting(self, organizer_id: int, title: str = None):
        try:
            # 1. check if the orgnaizer exists
            organizer = self.user_repo.get_by_id(id=organizer_id)
            if not organizer:
                return {
                    "success": False,
                    "Error": f"Organizer with id: {organizer_id} is not found",
                }

            # 2. Create the meeting
            meeting = self.meeting_repo.create_with_code(
                organizer_id=organizer_id, title=title
            )

            # 3. Create the first Participant as a host
            organizer_host = self.participant_repo.join_meeting(
                meeting.id, organizer_id, role=ParticipantStatus.host
            )

            return {"success": True, "data": meeting_to_dict(meeting)}

        except Exception as exp:
            return {
                "success": False,
                "error": f"something went wrong while trying to create a meeting {str(exp)}",
                "data": None,
            }

    # Get meeting details by code or ID
    def get_meeting(self, meeting_code: str = None, meeting_id: int = None):
        try:
            if meeting_code:
                meeting = self.meeting_repo.get_by_code(meeting_code)
            elif meeting_id:
                meeting = self.meeting_repo.get_with_participants(meeting_id)
            else:
                return {
                    "success": False,
                    "error": "Either meeting_code or meeting_id must be provided",
                    "data": None,
                }

            if not meeting:
                return {"success": False, "error": "Meeting not found", "data": None}

            return {"success": True, "error": None, "data": meeting_to_dict(meeting)}

        except Exception as exp:
            return {
                "success": False,
                "error": f"Something went wrong while trying to get a meeting {str(exp)}",
                "data": None,
            }

    # Join user to a meeting
    def join_meeting(
        self,
        meeting_code: str,
        user_id: int,
        camera_enabled: bool = False,
        microphone_enabled: bool = False,
    ):
        try:
            # 1.Get meeting by code
            meeting = self.meeting_repo.get_by_code(meeting_code)
            if not meeting:
                return {"success": False, "error": "Meeting not found", "data": None}

            # 2. Check if the meeting is still active
            if meeting.status != MeetingStatus.ACTIVE:
                return {
                    "success": False,
                    "error": f"Meeting is {meeting.status.value}, cannot join",
                }

            # 3. Verify user exists
            user = self.user_repo.get_by_id(user_id)
            if not user:
                return {"success": False, "error": "User not found", "data": None}

            # 4. Check if user is already a participant
            existing_participant = self.participant_repo.get_by_meeting_and_user(
                meeting.id, user_id
            )

            if existing_participant:
                if existing_participant.status == ParticipantStatus.joined:
                    return {
                        "success": False,
                        "error": "User is already in the meeting",
                    }
                else:
                    # Rejoin if previously left
                    participant = self.participant_repo.update(
                        existing_participant,
                        status=ParticipantStatus.joined,
                        camera_enabled=camera_enabled,
                        microphone_enabled=microphone_enabled,
                        left_at=None,
                    )
            else:
                # Create new participant
                participant = self.participant_repo.create(
                    meeting_id=meeting.id,
                    user_id=user_id,
                    role=ParticipantRole.participant,
                    status=ParticipantStatus.joined,
                    camera_enabled=camera_enabled,
                    microphone_enabled=microphone_enabled,
                )

            # Update user's last active time
            self.user_repo.update_last_active(user)

            return {
                "success": True,
                "data": {
                    "meeting": meeting_to_dict(meeting=meeting),
                    "participants": participant_to_dict(participant=participant),
                },
            }

        except Exception as exp:
            self.db.rollback()
            return {
                "success": False,
                "message": "Something went wrong while trying to join a meeting",
                "error": str(exp),
            }

    # Get all participants for a meeting
    def get_participants(self, meeting_code: str = None, meeting_id: int = None):
        try:
            # 1. Get meeting
            if meeting_code:
                meeting = self.meeting_repo.get_by_code(meeting_code)
            elif meeting_id:
                meeting = self.meeting_repo.get_by_id(meeting_id)
            else:
                return {
                    "success": False,
                    "error": "meeting_code or meeting_id must be provided",
                }

            if not meeting:
                return {"success": False, "error": "Meeting not found", "data": None}

            # 2. Get all participants
            participants = self.participant_repo.get_meeting_participants(meeting.id)
            active_participants = [
                p for p in participants if p.status == ParticipantStatus.joined
            ]

            participants_data = []
            for participant in participants:
                participants_data.append(participant_to_dict(participant=participant))

            return {
                "success": True,
                "error": None,
                "data": {
                    "meeting_id": meeting.id,
                    "meeting_code": meeting.code,
                    "total_participants": len(participants),
                    "active_participants": len(active_participants),
                    "participants": participants_data,
                },
            }

        except Exception as e:
            return {
                "success": False,
                "error": f"Something went wrong while getting the participants: {str(e)}",
                "data": None,
            }

    # Participant Leaves the meeting
    def leave_meeting(self, meeting_id: int, user_id: int):
        try:
            # 1. Get the participant from a specific meeting with his id
            participant = self.participant_repo.get_by_meeting_and_user(
                meeting_id, user_id
            )
            if not participant:
                return {
                    "success": False,
                    "error": "Participant is not found",
                    "data": None,
                }
            # 2. Check if the Participant still in the meeting
            if participant.status != ParticipantStatus.joined:
                return {
                    "success": False,
                    "error": "User is not currently in the meeting",
                    "data": None,
                }

            # 3. Update participant status
            self.participant_repo.leave_meeting(participant)

            return {
                "success": True,
                "error": None,
                "data": {
                    "message": "Successfully left the meeting",
                    "participant": participant_to_dict(participant=participant),
                },
            }

        except Exception as e:
            self.db.rollback()
            return {
                "success": False,
                "error": f"Something went wrong while trying to leave the meeting: {str(e)}",
                "data": None,
            }

    # End the meeting by the organizer
    def end_meeting(self, meeting_id: int, organizer_id: int):
        try:
            # 1. Get the meeting
            meeting = self.meeting_repo.get_by_id(meeting_id)
            if not meeting:
                return {"success": False, "error": "Meeting not found", "data": None}

            # 2. Check the ownership of the id and the current meeting status
            if meeting.organizer_id != organizer_id:
                return {
                    "success": False,
                    "error": "Only the organizer can end the meeting",
                    "data": None,
                }

            if meeting.status == MeetingStatus.ENDED:
                return {
                    "success": False,
                    "error": "Meeting is already ended",
                    "data": None,
                }

            # 3. Update meeting status
            self.meeting_repo.update_status(meeting, MeetingStatus.ENDED)

            # 4. Update all active participants to left status
            active_participants = self.participant_repo.get_active_participants(
                meeting_id
            )
            for participant in active_participants:
                self.participant_repo.leave_meeting(participant)

            return {
                "success": True,
                "error": None,
                "data": {
                    "message": "Meeting ended successfully",
                    "meeting": meeting_to_dict(meeting=meeting),
                },
            }

        except Exception as e:
            self.db.rollback()
            return {
                "success": False,
                "error": f"Something went wrong while trying to end the meeting: {str(e)}",
                "data": None,
            }
