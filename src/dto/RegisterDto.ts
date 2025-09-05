
/*
private String firstName;
	private String lastName;
	private String email;
	private String username;
	private String password;
	
	private List<String> qualifications;
	private BigDecimal networth;
	
	private int discountPoint;
	private String education;
*/
export type RegisterDto={
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    qualifications?: string[];
    education?: string;
}