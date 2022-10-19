const admin = require('firebase-admin');

const type = "service_account";
const project_id = "goodbank-d8d18";
const private_key_id = "42769554b5dbcb0ce12472bf12512ada42f235d7";
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC97fDX3pGrLWKZ\npPnCRQZwT4wWfDfThEannY0ZYntQAZyaGnxDzwfFkER+penz4G3b4u8rrkTnbB/c\nPgG3zikBD5Ri5nTUJSPmUqzbKum0sdAzuqX5igECnTmApuMlCqnzPYFS5K0CrEKz\n7fMjiQfzjGxPttM+ubJN/Y+pLb35OKOA4ae+9LjvXP6RxEzYYKyivEhxQBaCNAUR\nINQieNdOA+vEwYNO52/iZvitmnn/czJwAs1H/6J/H1jCLk7/2GRSq1vPbwTpbmRC\ntKdsV2jP3iiX0A9yTIYKghHcQAkYMz8zhCV81cUcge5vpnmY6iDsnEnM3n4tFWms\nc+GN/059AgMBAAECggEAASZZXKkxhxCDhgwYYftyfkgRAErYuKxWlCmxQrvUpMeZ\nt9ocsfllIeZNb9nXyHztlVTynzhTHPaL29S5RHBYUbQTMSUVhHpEFR8fgkUofIpO\nCR4iZpgWCPrEMBnyipUdscYHzCVrwbYiwj2YyPiJpokNV88yyLCtmmjET6EiAwn4\n0dd0ek0e2z7h7XiN/s6qfxlWIOrHHbOjBNMxQ8mVz1//71IwNXbjxNs+23lhW/Jn\nJTh13jATZ3RL851MvzMq80WpEWP3Plv/fOnnvyIkmVZ2047U4HX/OaH3OcQ4GQkt\nw3PdfF/gSDfzIGx46bsraL3EqtRE9LnRmylZqv3jcQKBgQDgeooTlBSP0alFEd63\nuJjRoEKw2Hxv8zx/8xw+SBIDzUqxiFT1Jb3RB5COf658HRdt09G7rL6VmI9dEFn6\nsuMdCyOPjW3Eq5oOzsSKbg5Xq5YwJqgQyfyRgdGp7JfaEK9C+ARyA3yBPjHoEZWC\nTufzqeWW01O9REJXePWJYR9/TQKBgQDYmXEFZ03AByAsxRxJ4ZJtTwtFKipiVlhT\nTAQ0bzoUiWVOrUMURc/xSXy/2trWzBb9eR52AeJNPoIr0pMWhNOhAcXYKXbCiDL1\n2kceGPkReg7CthhjxZdLuCcPjKXaA/MYsxu6asItYplcGuWtwvAuSTaEIb/NVV7f\n4osysRzT8QKBgG1DuEnnXkrS5u2z0RDkTZ5bv5qNBaUIZH5zO2AlfH9VQfJARfo9\nsLM6V2bFR40qK+lNnV0YrHvsknveJa4dvOa6MUkCsld0n7xtcMVg5KJP5v7xEgV6\nC/JXmlJ300JVtLmIN8G3aLcQKwKm7HtNJSI5pINRwgTyYMhrHDkOiWJRAoGAJ3fe\nVmO6kTE7Na09OGE4M17h6NqEGqMtORBy+7MA3Fkk8q8zt+/4sjj32GXi1p0d21ZE\nrLAvMnAffCjE0KengIE4MelsUIpM7uu1ZdCbIgohwm04CIYqyYtm4rh4SD/L/kY0\n2UU22NpMo7HrBDyvU1/X5T/ZGWti/FzljHkljaECgYAqoz2FQAVz1Fn/1qUMHWx/\nDyNyzh+jGw/Z/Shz9sjv5LdLi6gNorFdQZ6bpO7TDAhVh88WzczT6N1Jc10KFLVb\nP7BcdVgFOYkCyFJyxmYYTMd3iejL2+7/xxfIALPAE7Y1ti1GWWoNpZXjvV2mzBOs\nKGT83idp/xaAYVIMGjRCWA==\n-----END PRIVATE KEY-----\n";
const client_email = "firebase-adminsdk-cafpm@goodbank-d8d18.iam.gserviceaccount.com";
const client_id = "109930626343640622663";
const auth_uri = "https://accounts.google.com/o/oauth2/auth";
const token_uri = "https://oauth2.googleapis.com/token";
const auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs";
const client_x509_cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hl9ml%40courso-bf828.iam.gserviceaccount.com";



// credential grants access to Firebase services
admin.initializeApp({
    credential: admin.credential.cert({
        type,
        project_id,
        private_key_id,
        private_key:
          private_key.replace(/\\n/g,'\n'),
        client_email,
        client_id,
        auth_uri,
        token_uri,
        auth_provider_x509_cert_url,
        client_x509_cert_url
    }),
  });

module.exports = admin;