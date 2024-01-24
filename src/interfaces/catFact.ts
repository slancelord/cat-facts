import user from "@/interfaces/user";

export default interface catFact {
    _id: string; 
    user: user;
    text: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}