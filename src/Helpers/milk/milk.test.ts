import { sortMilkCollectionByDate } from "./milk";

describe('Sort milk collection', () => {
    const unsortedCollectionMilk = [
        {
            "id": "Zwj3cKtzxDcavpiIkeqq",
            "collectionDate": {
                "seconds": 1694246538,
                "nanoseconds": 618000000
            },
            "liters": 24
        },
        {
            "id": "hXX8WHOEmLH02irlpQna",
            "collectionDate": {
                "seconds": 1694323314,
                "nanoseconds": 213000000
            },
            "liters": 14
        },
        {
            "id": "tRYJ0eLRsFTAQI4QeZHK",
            "collectionDate": {
                "seconds": 1694323684,
                "nanoseconds": 180000000
            },
            "liters": 19
        },
        {
            "id": "aMuj8vi6CJPRyiHcpTbt",
            "collectionDate": {
                "seconds": 1694404868,
                "nanoseconds": 232000000
            },
            "liters": 10
        }
    ]

    const sortedCollectionMilk = [
        {
            "id": "aMuj8vi6CJPRyiHcpTbt",
            "collectionDate": {
                "seconds": 1694404868,
                "nanoseconds": 232000000
            },
            "liters": 10
        },
        {
            "id": "tRYJ0eLRsFTAQI4QeZHK",
            "collectionDate": {
                "seconds": 1694323684,
                "nanoseconds": 180000000
            },
            "liters": 19
        },
       
        {
            "id": "hXX8WHOEmLH02irlpQna",
            "collectionDate": {
                "seconds": 1694323314,
                "nanoseconds": 213000000
            },
            "liters": 14
        },
       
       
        {
            "id": "Zwj3cKtzxDcavpiIkeqq",
            "collectionDate": {
                "seconds": 1694246538,
                "nanoseconds": 618000000
            },
            "liters": 24
        },
        
       
       
    ]
    test('It should sort milk collection by collection date from most recent to least recent', () => {
        expect(sortMilkCollectionByDate(unsortedCollectionMilk)).toEqual(sortedCollectionMilk);
    });

});