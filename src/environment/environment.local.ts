export const environment = {
    production: false,
    apiUrl: 'http://localhost:7071/api',
    productCatalog: [
        {
            id: 1,
            name: 'Chocolate Cake',
            description: 'A sweet treat that melts in your mouth.',
            imageUrl: 'assets/svgs/chocolate-cake.svg',
            size: [
                {
                    name: 'Small',
                    price: 2.99
                },
                {
                    name: 'Medium',
                    price: 3.99
                },
                {
                    name: 'Large',
                    price: 4.99
                }
            ],
            candy: [
                {
                    name: 'Blue Raspberry',
                    price: 0.50
                },
                {
                    name: 'Strawberry',
                    price: 0.50
                },
                {
                    name: 'Grape',
                    price: 0.50
                }
            ],
            syrup: [
                {
                    name: 'Chocolate',
                    price: 0.50
                },
                {
                    name: 'Caramel',
                    price: 0.50
                },
                {
                    name: 'Strawberry',
                    price: 0.50
                }
            ]
        }
    ]
};