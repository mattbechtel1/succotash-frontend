export const versions = [
    {
        title: 'Preview v0.1',
        release: new Date('February 7, 2020'),
        notes: [
            "Preview deployment",
            "Login and JWT web tokens initialized",
            "Field grid view and dynamic calendar introduced"
        ]
    }, {
        title: 'Preview v0.2',
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
        title: 'v1.0.01',
        release: new Date('February 13, 2020'),
        notes: [
            'Changed validation scopes to allow different users to have same field name',
            'Made header sticky',
            'New field form cancelation now redirects to profile page',
            'Favorites list is sorted alphabetically'            
        ]
    }, {
        title: 'v1.0.02',
        release: new Date('February 20, 2020'),
        notes: [
            'Adjusted stage logic to no longer create overlapping stages.',
            'Loaders added to favorites and todo/deadline components'
        ]
    }, {
        title: 'v1.0.03',
        release: new Date('February 27, 2020'),
        notes: [
            'Guide page added',
        ]
    }, {
        title: 'v1.0.04',
        release: new Date('March 4, 2020'),
        notes: [
            'Rendering performance improvements',
        ]
    }, {
        title: 'v1.0.04',
        release: new Date('March 9, 2020'),
        notes: [
            'Developer page added'
        ]
    }
]