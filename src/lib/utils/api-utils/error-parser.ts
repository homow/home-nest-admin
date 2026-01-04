export function errorParser(error: Error, defaultText?: string): string {
    if (!error) return "خطای ناشناخته رخ داد";
    
    if (
        error.message.includes("Invalid email or password")
    ) {
        return "ایمیل یا رمز عبور اشتباه است.";
    }

    if (defaultText) return defaultText;

    return "خطای ناشناخته رخ داد";
}