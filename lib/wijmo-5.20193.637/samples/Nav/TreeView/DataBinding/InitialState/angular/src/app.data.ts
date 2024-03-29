import { Injectable } from '@angular/core';
//
export class TreeItem {
    header: string;
    newItem?: boolean;
    img?: string;
    items?: TreeItem[]
}
//
@Injectable()
export class DataService {
    getData(): TreeItem[] {
        return [
            {
                header: 'Electronics',
                img: 'resources/electronics.png',
                items: [
                    { header: 'Trimmers/Shavers' },
                    { header: 'Tablets' },
                    {
                        header: 'Phones',
                        img: 'resources/phones.png',
                        items: [
                            { header: 'Apple' },
                            { header: 'Motorola', newItem: true },
                            { header: 'Nokia' },
                            { header: 'Samsung' }]
                    },
                    { header: 'Speakers', newItem: true },
                    { header: 'Monitors' }]
            },
            {
                header: 'Toys', img: 'resources/toys.png',
                items: [
                    { header: 'Shopkins' },
                    { header: 'Train Sets' },
                    { header: 'Science Kit', newItem: true },
                    { header: 'Play-Doh' },
                    { header: 'Crayola' }
                ]
            },
            {
                header: 'Home', img: 'resources/home.png',
                items: [
                    { header: 'Coffee Maker' },
                    { header: 'Breadmaker', newItem: true },
                    { header: 'Solar Panel', newItem: true },
                    { header: 'Work Table' },
                    { header: 'Propane Grill' }
                ]
            }
        ];
    }
}