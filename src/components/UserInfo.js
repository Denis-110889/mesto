export class UserInfo {
    constructor({profileNameSelector, profileJobSelector, avatarElementSelector}){
        this._nameElement = document.querySelector(profileNameSelector);
        this._jobElement = document.querySelector(profileJobSelector);
        this._avatarElement = document.querySelector(avatarElementSelector);
    };

    getUserInfo(){
        return{
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        };
    };
    
    setUserInfo(title, job){
        this._nameElement.textContent = title;
        this._jobElement.textContent = job;
    };

    setAvatar({avatar}){
        this._avatarElement.src = avatar;
    };
};