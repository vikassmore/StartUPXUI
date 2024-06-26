export interface UserForRegistration {
    firstName: string;
    lastName: string;
    emailId: string;
    mobileNo: string;
    userPassword: string;
   // departmentId: BigInteger;
    roleId: BigInteger;
    //status:string;

}
export interface UserEditRegistration {
    firstName: string;
    lastName: string;
    emailId: string;
    mobileNo: string;
    userPassword: string;
    //address: string;
    roleId: number;
    userId: number;
   // departmentId:number;
}