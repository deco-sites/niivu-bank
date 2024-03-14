interface CreateEmailBase {
    name: string;
    email: string;
    sanderName: string;
    sanderEmail: string;
}

interface CreateEmailApproved extends CreateEmailBase {
    templateIdApproved: string;
}

interface CreateEmailRepruved extends CreateEmailBase {
    templateIdReproved: string;
}

export function createEmailApproved({
    name,
    email,
    sanderName,
    sanderEmail,
    templateIdApproved
}: CreateEmailApproved){
    return {
        sender: { name: sanderName, email: sanderEmail },
        to: [{ email, name }],
        templateIdApproved,
    };
}

export function createEmailRepruved({
    name,
    email,
    sanderName,
    sanderEmail,
    templateIdReproved
}: CreateEmailRepruved){
    return {
        sender: { name: sanderName, email: sanderEmail },
        to: [{ email, name }],
        templateIdReproved,
    };
}