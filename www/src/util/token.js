var s3sToken = {};

// Resolves only when token is set
s3sToken.tokenPromise = new Promise((resolve, reject) => {
    if (sessionStorage.token != null) {
        resolve();
    } else {
        s3sToken.onTokenSet = () => {
            resolve();
        }        
    }
});

s3sToken.setToken = (token) => {
    if (sessionStorage.token == null) {
        // Setting the new token
        sessionStorage.token = token;
        s3sToken.onTokenSet();
    } else {
        // Replacing an existing token
        sessionStorage.token = token;
        window.location.reload();
    }
};

export {s3sToken};