import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { WEBSITES_ARRAY } from "@/config/websites";
import type { Website } from "@/types";

type WebsiteSelectorProps = {
    selectedWebsite: Website | "";
    onWebsiteChange: (websiteId: Website) => void;
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
                <SelectTrigger>
                    <SelectValue placeholder="Choose a website" />
                </SelectTrigger>
                <SelectContent>
                    {WEBSITES_ARRAY.map((website) => (
                        <SelectItem
                            key={website.id}
                            value={website.id}>
                            {website.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
