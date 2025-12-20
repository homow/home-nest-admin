import type {MainComponentProps} from "@/types/ui";
import Icon from "@/components/icon/Icon";

export default function SearchBar({className}: MainComponentProps) {
    return <Icon parentClassName={className} icon={"search"}/>;
};