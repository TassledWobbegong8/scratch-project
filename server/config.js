/* eslint-disable indent */
module.exports = {
    JWTsecret: 'mysecret',
    baseURL: 'http://localhost:3000',
    oauth2Credentials: {
        client_id: '609389573912-4edqp4q82jt67rncqeeq0504o482vdkp.apps.googleusercontent.com',
        project_id: 'artful-zone-364600',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_secret: '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',
        redirect_uris: [
            'http://localhost:3000/auth_callback'
        ],
        javascript_origins: [
            'http://localhost:8080',
            'http://localhost:3000'
        ],
        scopes: [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/documents'
        ],

    },

};