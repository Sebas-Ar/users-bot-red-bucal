const query = [
    {
        $match: { state: true },
    },
    {
        $project: {
            name: true,
            email: true,
            end: true,
            alerts: true
        }
    }
]