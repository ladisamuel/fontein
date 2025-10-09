
// {
//     "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc2MDUzOTQ5NywiaWF0IjoxNzU5OTM0Njk3LCJqdGkiOiJkNGRkZWIxNGY3MTY0MWM3ODQ0Y2NkNmRiODFlOTMxNSIsInVzZXJfaWQiOiIxIn0.2Sn8V-Y6Xp0rvz8v3bEvpBKkesjI_3xyCwkbO2eBFis",
//     "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYwMDIxMDk3LCJpYXQiOjE3NTk5MzQ2OTcsImp0aSI6IjY4MDdiOTU4MWIwYTRmNjA5YmIwOTE4YTU4Y2RlMzlmIiwidXNlcl9pZCI6IjEifQ.vs3keeTr2VqEU_B3fCA5h95Eay3zfs_yVsPtqIytQ_Y",
//     "user": {
//         "id": "1",
//         "email": "suprytech@email.com",
//         "username": null,
//         "is_verified": false,
//         "is_onboarded": false,
//         "role": "ADMIN"
//     }
// }

interface UserType {
        id: any;
        email: string;
        username: string | null;
        is_verified: boolean;
        is_onboarded: boolean;
        role: string;    
}

interface AuthType {
    refresh: string;
    access: string;
    user: UserType;
}

export type {
    UserType,
    AuthType,
}