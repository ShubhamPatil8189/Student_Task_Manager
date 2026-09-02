function Analytics() {

    const totalTasks = 18;
    const completedTasks = 12;
    const pendingTasks = 6;
    const completion = Math.round((completedTasks / totalTasks) * 100);

    return (
        <div className="view-content">

            <h2>📈 Analytics Dashboard</h2>

            <div className="stats-grid">

                <div className="stat-card">
                    <h3>Total Tasks</h3>
                    <h1>{totalTasks}</h1>
                </div>

                <div className="stat-card">
                    <h3>Completed</h3>
                    <h1>{completedTasks}</h1>
                </div>

                <div className="stat-card">
                    <h3>Pending</h3>
                    <h1>{pendingTasks}</h1>
                </div>

                <div className="stat-card">
                    <h3>Completion</h3>
                    <h1>{completion}%</h1>
                </div>

            </div>

            <div className="welcome-card">

                <h3>Recent Activity</h3>

                <ul>
                    <li>✅ Completed Math Assignment</li>
                    <li>📝 Added Physics Homework</li>
                    <li>📚 Studied React Components</li>
                    <li>🎯 Finished Git Practice</li>
                </ul>

            </div>

        </div>
    );
}

export default Analytics;