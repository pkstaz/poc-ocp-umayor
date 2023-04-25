export interface ChatDocente {
	  userID?:     string;
    avatar?:     string;
    nombre?:     string;
    rut?:        string;
    userName?:   string;
    subject?:    string;
    active?:     boolean;
    date?:       string;
    asignatura?: string;
    messageID?:  string;
		status?: string;
    buble?:      Buble[];
}

export interface Buble {
    messageID?: string;
    author?:    string;
    date?:      string;
    time?:      string;
    read?:      boolean;
    message?:   string;
    position?:  string;
}
