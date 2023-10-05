<h1>Asylcenter</h1>
<p>Asylcenter is a web application that allows users to receive their posts from the immigration office and keep track of events that will be held in the asylum center. The backend of the app is built using .NET Web API with .NET 7 and the database is powered by PostgreSQL. The frontend is developed using Angular 15 and provides an easy-to-use interface for users to view their posts and upcoming events. The app also has an administrative section that allows authorized personnel to manage users, add posts, and create events in real-time.</p>
<h2>The Deployed Version can be accessed here https://asylcenter.fly.dev </h2>

<h2>Running Locally Requirements</h2>
<ul>
   <li><a href="https://dotnet.microsoft.com/download/dotnet/7.0" target="_new">.NET 7</a></li>
   <li><a href="https://www.postgresql.org/" target="_new">PostgreSQL</a></li>
   <li><a href="https://angular.io/guide/setup-local" target="_new">Angular 15</a></li>
</ul>
<h2>Installation</h2>
<ol>
   <li>Clone the repository: <code>git clone https://github.com/raihanmehran/asylcenter.git</code></li>
   <li>Navigate to the backend directory: <code>cd asylcenter/API</code></li>
   <li>Restore NuGet packages: <code>dotnet restore</code></li>
   <li>Update the database connection string in the <code>appsettings.json</code> file to match your PostgreSQL instance</li>
   <li>Run the database migrations: <code>dotnet ef database update</code></li>
   <li>Start the backend server: <code>dotnet run</code></li>
   <li>Navigate to the frontend directory: <code>cd ../client</code></li>
   <li>Install dependencies: <code>npm install</code></li>
   <li>Start the frontend server: <code>ng serve</code></li>
</ol>
<h2>Usage</h2>
<p>Once the application is installed and running, you can access the frontend by navigating to <code>https://localhost:4200</code> in your web browser. Users will be able to view their posts and upcoming events, while authorized personnel will be able to manage users, add posts, and create events in real-time.</p>
<h2>Visuals</h2>


<h2>Contributing</h2>
<p>Contributions to Asylcenter are welcome and encouraged. To contribute, please fork the repository, make your changes, and submit a pull request.</p>
<h2>License</h2>
<p>Asylcenter is released under the <a href="https://opensource.org/licenses/MIT" target="_new">MIT License</a>.</p>
