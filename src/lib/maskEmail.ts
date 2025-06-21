export function maskEmail(email: string): string {
    const [localPart, domainPart] = email.split("@");
    if (!localPart || !domainPart) {
      throw new Error("Invalid email format");
    }
  
    const localVisible = localPart.slice(-2); // Last two characters of the local part
    const domainParts = domainPart.split(".");
    const domainVisible = domainParts[0].slice(0, 2); // First two characters of the domain
    const tld = domainParts.slice(1).join("."); // Top-level domain (e.g., com, org)
  
    return `${"•".repeat(localPart.length - 2)}${localVisible}@${domainVisible}${"•".repeat(domainParts[0].length - 2)}.${tld}`;
  }