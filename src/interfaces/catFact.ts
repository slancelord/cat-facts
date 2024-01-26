import user from "@/interfaces/user";

export default interface catFact {
    _id: string; 
    user: user;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}