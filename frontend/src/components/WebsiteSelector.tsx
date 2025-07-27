import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { WEBSITES_ARRAY } from "@/config/websites";

type WebsiteSelectorProps = {
    selectedWebsite: string;
    onWebsiteChange: (websiteId: string) => void;
};

export const WebsiteSelector = ({
    selectedWebsite,
    onWebsiteChange,
}: WebsiteSelectorProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor="website-select">Select Website</Label>
            <Select
                value={selectedWebsite}
                onValueChange={onWebsiteChange}>
                <SelectTrigger data-testid="website-selector">
                    <SelectValue placeholder="Choose a website" />
                </SelectTrigger>
                <SelectContent>
                    {WEBSITES_ARRAY.map((website) => (
                        <SelectItem
                            key={website.id}
                            value={website.id}
                            data-testid={`website-option-${website.id}`}>
                            {website.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
