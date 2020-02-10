export interface IPeople {
    id?: any;
    fullName?: string;
    preferredName?: string;
    searchName?: string;
    isPermittedToLogon?: boolean;
    logonName?: string;
    isExternalLogonProvider?: boolean;
    isSystemUser?: boolean;
    isEmployee?: boolean;
    isSalesPerson?: boolean;
    isGuestUser?: boolean;
    emailPromotion?: number;
    userPreferences?: string;
    phoneNumber?: string;
    emailAddress?: string;
    photo?: string;
    customFields?: string;
    otherLanguages?: string;
    validFrom?: Date;
    validTo?: Date;
}

export class People implements IPeople {
    constructor(
        public id?: any,
        public fullName?: string,
        public preferredName?: string,
        public searchName?: string,
        public isPermittedToLogon?: boolean,
        public logonName?: string,
        public isExternalLogonProvider?: boolean,
        public isSystemUser?: boolean,
        public isEmployee?: boolean,
        public isSalesPerson?: boolean,
        public isGuestUser?: boolean,
        public emailPromotion?: number,
        public userPreferences?: string,
        public phoneNumber?: string,
        public emailAddress?: string,
        public photo?: string,
        public customFields?: string,
        public otherLanguages?: string,
        public validFrom?: Date,
        public validTo?: Date
    ) {
        this.id = id ? id : null;
        this.fullName = fullName ? fullName : null;
        this.preferredName = preferredName ? preferredName : null;
        this.searchName = searchName ? searchName : null;
        this.isPermittedToLogon = isPermittedToLogon ? isPermittedToLogon : false;
        this.logonName = logonName ? logonName : null;
        this.isExternalLogonProvider = isExternalLogonProvider ? isExternalLogonProvider : false;
        this.isSystemUser = isSystemUser ? isSystemUser : false;
        this.isEmployee = isEmployee ? isEmployee : false;
        this.isSalesPerson = isSalesPerson ? isSalesPerson : false;
        this.isGuestUser = isGuestUser ? isGuestUser : false;
        this.emailPromotion = emailPromotion ? emailPromotion : null;
        this.userPreferences = userPreferences ? userPreferences : null;
        this.phoneNumber = phoneNumber ? phoneNumber : null;
        this.emailAddress = emailAddress ? emailAddress : null;
        this.photo = photo ? photo : null;
        this.customFields = customFields ? customFields : null;
        this.otherLanguages = otherLanguages ? otherLanguages : null;
        this.validFrom = validFrom ? validFrom : new Date();
        this.validTo = validTo ? validTo : new Date();
    }
}