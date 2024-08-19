import * as SQLite from 'expo-sqlite'

export async function StartDB(){
    const db = SQLite.openDatabaseSync('capital.db');
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        --DROP TABLE IF EXISTS properties;
        CREATE TABLE IF NOT EXISTS properties (id INTEGER PRIMARY KEY NOT NULL, title VARCHAR(255) NOT NULL, value INTEGER NOT NULL, address VARCHAR(255) NOT NULL, rooms INTEGER NOT NULL, bathrooms INTEGER NOT NULL, garage_capacity INTEGER NOT NULL);
        `);
}

export async function GetProperties(){
    const db = SQLite.openDatabaseSync('capital.db');
        const allRows = await db.getAllAsync('SELECT * FROM properties');
        return allRows
}

export async function CreatePropertie(title, value, address, rooms, bathrooms, garageCapacity) {
    const db = SQLite.openDatabaseSync('capital.db');
    if (title != null && value != null && address != null && rooms != null && bathrooms != null && garageCapacity != null) {
        try {
            await db.runAsync(`
                INSERT INTO properties (title, value, address, rooms, bathrooms, garage_capacity)
                VALUES ($title, $value, $address, $rooms, $bathrooms, $garageCapacity);
            `, {
                $title: title,
                $value: value,
                $address: address,
                $rooms: rooms,
                $bathrooms: bathrooms,
                $garageCapacity: garageCapacity
            });
            console.log('Property inserted successfully', title, value);
        } catch (error) {
            console.error('Error inserting property:', error);
        }
    } else {
        console.error('One or more parameters are invalid:', { title, value, address, rooms, bathrooms, garageCapacity });
    }
}

export async function DeleteProperty(id){
    const db = SQLite.openDatabaseSync('capital.db');
    if (id) {
        try {
            await db.runAsync(`
                DELETE FROM properties WHERE id = $id;
            `, {$id: id});
            console.log('Property deleted successfully', id);
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    } else {
        console.error('ID is invalid:', id);
    }
}
export async function GetPropertyById(id) {
    const db = SQLite.openDatabaseSync('capital.db');
    if (id) {
        try {
            console.log(id)
            const property = await db.getAllAsync(`
                SELECT * FROM properties WHERE id = $id;
            `, { $id: id });
            return property[0];
        } catch (error) {
            console.error('Error retrieving property:', error);
        }
    } else {
        console.error('ID is invalid:', id);
    }
}
