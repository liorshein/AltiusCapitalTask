import { useDeals } from "@/hooks/useDeals";
import { DealCard } from "@/components/DealCard";

const Home = () => {
    const { data: deals, isLoading, error } = useDeals();

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                        <p className="text-muted-foreground">Loading deals...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <p className="text-red-500 mb-2">Error loading deals</p>
                        <p className="text-muted-foreground text-sm">
                            {error instanceof Error ? error.message : 'An unexpected error occurred'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Deals Dashboard</h1>
                    <p className="text-muted-foreground mt-2">
                        Browse available deals from your connected financial websites
                    </p>
                </div>

                {!deals || deals.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-lg font-medium mb-2">No deals found</p>
                            <p className="text-muted-foreground">
                                There are no deals available at the moment.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {deals.map((deal, index) => (
                            <DealCard 
                                key={`deal-${index}`} 
                                deal={deal} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export { Home };