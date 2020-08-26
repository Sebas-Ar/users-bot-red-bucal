const query = [
    {
        $match: { state: true },
    },
    {
        $project: {
            end: true,
            alerts: true
        }
    }
]