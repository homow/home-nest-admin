import {ThemeProvider} from 'next-themes';
import {type MainComponentProps} from "@/types/ui";

export default function CustomThemeProvider({children}: MainComponentProps) {
    return (
        <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
        >
            {children}
        </ThemeProvider>
    );
};