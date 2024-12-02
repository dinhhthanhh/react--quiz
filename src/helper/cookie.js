// function get cookie
export function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i<ca.length;i++){
        var c = ca[i];
        while(c.charAt(0) === ' '){
            c=c.substring(1);
        }
        if(c.indexOf(name) === 0){
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
// end function get cookie

// function set cookie 
export function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
}
// end function set cookie

// function delete cookie
export function deleteCookie(cname){
    document.cookie =  `${cname}=; expires = Thu, 01 Jan 1970 00:00:00 UTC`;
}
// end function delete cookie

// function delete All cookie
export function deleteAllCookie(){
    const cookies = document.cookie.split(';');
    for(let i=0;i<cookies.length;i++){
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0,eqPos) : cookie;
        document.cookie = name + "=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
// end function delete all cookie