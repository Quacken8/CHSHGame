/**
* Initializes new session
*/
export interface InitSessionRequest {
	message: "init-session",
}

/**
* Requests to leave current session
*/
export interface LeaveSessionRequest {
	message: "leave-session",
}

/**
* Requests to join a session
*/
export interface JoinSessionRequest {
	message: "join-session",
	content: {
		sid: number,
	}
}

/**
* Sends message to the other client in a paired session
*/
export interface MsgRequest {
	message: "msg",
	content: {
		msg: string,
	}
}

/**
* User is present in a session (sid)
*/
export interface InSessionResponse {
	message: "in-session",
	content: {
		sid: number,
	}
}

/**
* User is not in any session
*/
export interface NotInSessionResponse {
	message: "not-in-session",
}

/**
* User can not create session at this time
*/
export interface CanNotCreateSessionResponse {
	message: "can-not-create-session",
}

/**
* Session ended, user is no longer in session
*/
export interface SessionEndResponse {
	message: "session-end",
}

/**
* Error specified by (info) data
*/
export interface ErrorResponse {
	message: "error",
	content: {
		info: string,
	}
}

/**
* User was paired in session (sid) and is given name (name)
*/
export interface SuccessfullyPairedResponse {
	message: "successfully-paired",
	content: {
		sid: number,
		name: string,
	}
}

/**
* Session (sid) is full
*/
export interface SessionFullResponse {
	message: "session-full",
	content: {
		sid: number,
	}
}

/**
* User is not in paired session
*/
export interface NotPairedResponse {
	message: "not-paired",
}

/**
* Message from the other client in pairing
*/
export interface MessageResponse {
	message: "message",
	content: {
		msg: string,
	}
}