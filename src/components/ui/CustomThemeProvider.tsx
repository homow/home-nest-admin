import {ThemeProvider} from 'next-themes';
import {type ChildrenComponentProps} from "@/types/ui"

export default function CustomThemeProvider({children}: ChildrenComponentProps) {
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