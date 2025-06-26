function getCookieValue(cookieString: string, cookieName: string) {
    const cookies = cookieString.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === cookieName) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return null;
}

export function getAuthHeader() {
    const token = getCookieValue(document.cookie, "token");
  
    return {
        'Authorization': `Bearer ${token}`,
        'Accept': "application/json",
    };
}