/**
* Initializes new session
*/
interface InitSessionRequest {
	message: "init-session",
}

/**
* Requests to leave current session
*/
interface LeaveSessionRequest {
	message: "leave-session",
}

/**
* Requests to join a session
*/
interface JoinSessionRequest {
	message: "join-session",
	content: {
		sid: number,
	}
}

/**
* Sends message to the other client in a paired session
*/
interface MsgRequest {
	message: "msg",
	content: {
		msg: string,
	}
}

/**
* User is present in a session (sid)
*/
interface InSessionResponse {
	message: "in-session",
	content: {
		sid: number,
	}
}

/**
* User is not in any session
*/
interface NotInSessionResponse {
	message: "not-in-session",
}

/**
* User can not create session at this time
*/
interface CanNotCreateSessionResponse {
	message: "can-not-create-session",
}

/**
* Session ended, user is no longer in session
*/
interface SessionEndResponse {
	message: "session-end",
}

/**
* Error specified by (info) data
*/
interface ErrorResponse {
	message: "error",
	content: {
		info: string,
	}
}

/**
* User was paired in session (sid) and is given name (name)
*/
interface SuccessfullyPairedResponse {
	message: "successfully-paired",
	content: {
		sid: number,
		name: string,
	}
}

/**
* Session (sid) is full
*/
interface SessionFullResponse {
	message: "session-full",
	content: {
		sid: number,
	}
}

/**
* User is not in paired session
*/
interface NotPairedResponse {
	message: "not-paired",
}

/**
* Message from the other client in pairing
*/
interface MessageResponse {
	message: "message",
	content: {
		msg: string,
	}
}