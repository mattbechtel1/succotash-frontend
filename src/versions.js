export const versions = [
    {
        title: 'Preview v0.1.1',
        release: new Date('February 7, 2020'),
        notes: [
            "Preview deployment",
            "Login and JWT web tokens initialized",
            "Field grid view and dynamic calendar introduced"
        ]
    }, {
        title: 'Preview v0.1.2',
        release: new Date('February 8, 2020'),
        notes: [
            'Environment preparations for v1.0 release',
            'Styling changes to calendars'
        ]
    }, {
        title: 'Version 1.0.0',
        release: new Date('February 12, 2020'),
        notes: [
            'First build intended for CICD',
            'Todo/Deadline feature and functionality added',
            'Basic favorites feature added',
            'Default crop list and add crop feature added',
            'Connected crop list with external API',
            'Picture feature connected with fields',
            'Field name changes allowed',
        ]
    }, {
        title: 'v1.0.1',
        release: new Date('February 13, 2020'),
        notes: [
            'Changed validation scopes to allow different users to have same field name',
            'Made header sticky',
            'New field form cancelation now redirects to profile page',
            'Favorites list is sorted alphabetically'            
        ]
    }, {
        title: 'v1.0.2',
        release: new Date('February 20, 2020'),
        notes: [
            'Adjusted stage logic to no longer create overlapping stages.',
            'Loaders added to favorites and todo/deadline components'
        ]
    }, {
        title: 'v1.0.3',
        release: new Date('February 27, 2020'),
        notes: [
            'Guide page added',
        ]
    }, {
        title: 'v1.0.4',
        release: new Date('March 4, 2020'),
        notes: [
            'Rendering performance improvements',
        ]
    }, {
        title: 'v1.0.5',
        release: new Date('March 9, 2020'),
        notes: [
            'Developer page added',
            'Improvements made to view changes initiated by links',
            'Upgraded Puma to v4.3.3',
            'Upgraded Nokogiri to v1.10.8'
        ]
    }, {
        title: 'v1.0.6',
        release: new Date('March 24, 2020'),
        notes: [
            'Favorite crops now appear at top of crop dropdown list for stages',
            'Last modified date for fields now update on changes to bed names & bed stages',
            'Upgraded Acorn to v5.7.4',
            'Upgraded Rails & Actionview to v6.0.2.2',
            'Changes to login proceedure. No longer accepts non-alphanumeric usernames',            
        ]
    }, {
        title: 'v1.0.7',
        release: new Date('March 27, 2020'),
        notes: [
            'Changed process that modifies updated dates',
            'Username and password validations added to backend, allowing users with old usernames to continue to access product'
        ]
    }, {
        title: 'v1.0.8',
        release: new Date('April 14, 2020'),
        notes: [
            'Reoriented backend functionality to better work for developers working in test and development',
            'Fixed major sorting issue that caused beds to be displayed in nonsensical order',
            'Default creation values for various backend models were added',
            'Fixed rendering issue on the guide page that caused incorrect image to zoom',
            'Eliminated large view header boxes for mobile devices',
            'Removed animations on how to pages for mobile devices',
            'Mass update of node packages'
        ]
    }, {
        title: 'v.1.0.9',
        release: new Date('April 25, 2020'),
        notes: [
            'Added HTTPS redirect to force users onto secure website. (Web app does not function when using HTTP.)',
            'Field view was adjusted for small screen devices.',
        ]
    }, {
        title: 'v1.0.10',
        release: new Date('June 14, 2020'),
        notes: [
            'Upgraded Websocket-Extensions to v0.1.4',
            'Upgraded Puma to v4.3.5',
            'Upgraded Rails to v6.0.3'
        ]
    }, {
        title: 'v1.0.11',
        release: new Date('September 12, 2020'),
        notes: [
            'Added warning informing the user that stage data will be overwritten when changing the date on an existing stage',
            'Upgraded Markdown-to-JSX to v6.11.4',
            'Upgraded elliptic to v6.5.3',
            'Upgraded node-http-proxy to v1.18.1',
            'Upgraded Lodash to v4.17.19',
            'Upgraded Rack to v2.2.3',
            'Upgraded NPM packages',
            'Minor updates to automated login feature'
        ]
    }
]