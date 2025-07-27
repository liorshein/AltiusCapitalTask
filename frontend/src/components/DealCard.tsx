import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
    CalendarDays,
    Building2,
    DollarSign,
    Mail,
    Download,
} from "lucide-react";
import { useDownloadDealFile } from "@/hooks/useDownloadDeal";
import type { Deal } from "@/types";
import { formatDate } from "@/lib/date";

type DealCardProps = {
    deal: Deal;
};

export const DealCard = ({ deal }: DealCardProps) => {
    const { mutate: downloadDealFile, isPending: isDownloading } =
        useDownloadDealFile();

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "closed":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-blue-100 text-blue-800";
        }
    };

    const handleDownload = () => {
        downloadDealFile(deal.id);
    };

    return (
        <Card className="h-full hover:shadow-md transition-shadow" data-testid="deal-card">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg line-clamp-2">
                        {deal.title}
                    </CardTitle>
                    {deal.deal_status && (
                        <Badge
                            className={getStatusColor(deal.deal_status)}
                            variant="secondary">
                            {deal.deal_status}
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
                {deal.firm && (
                    <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{deal.firm}</span>
                    </div>
                )}

                {(deal.asset_class || deal.currency) && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>
                            {[deal.asset_class, deal.currency]
                                .filter(Boolean)
                                .join(" • ")}
                        </span>
                    </div>
                )}

                {deal.created_at && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        <span>{formatDate(deal.created_at)}</span>
                    </div>
                )}

                {deal.deal_capital_seeker_email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">
                            {deal.deal_capital_seeker_email}
                        </span>
                    </div>
                )}

                {deal.files_available && (
                    <div className="pt-2">
                        <Button
                            onClick={handleDownload}
                            disabled={isDownloading || !deal.title}
                            className="w-full flex items-center gap-2"
                            size="sm"
                            data-testid={`download-deal-${deal.id}`}>
                            <Download className="h-4 w-4" />
                            {isDownloading ? "Downloading..." : "Download Deal"}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
