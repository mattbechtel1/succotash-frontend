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
            'Updated Puma to v4.3.3',
            'Updated Nokogiri to v1.10.8'
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
        release: 'TBD"',
        notes: [
            'Fixed major sorting issue that caused beds to be displayed in nonsensical order',
            'Fixed rendering issue on the guide page that caused incorrect image to zoom',
            'Logic that is used to create default beds and stages upon the creation of a new field was migrated from controller-based creation to model-based creation',
            'Default creation values for various backend models were added.'
        ]
    }
]