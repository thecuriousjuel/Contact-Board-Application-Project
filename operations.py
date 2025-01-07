import os
import sqlite3

if not os.path.exists('database'):
    os.makedirs('database')
DATABASE = os.path.join('database', 'users.db')


def create_user(first_name, last_name, email):
    # Connect to the SQLite database (or create it if it doesn't exist)
    conn = sqlite3.connect(database=DATABASE)
    cursor = conn.cursor()

    try:
        # Create the users table if it doesn't exist
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            )
        ''')

        # Insert the user details into the users table
        cursor.execute('''
            INSERT INTO users (first_name, last_name, email)
            VALUES (?, ?, ?)
        ''', (first_name, last_name, email))

        # Commit the transaction
        conn.commit()
    except sqlite3.IntegrityError as e:
        if 'UNIQUE constraint failed' in str(e):
            return {
                'status': 409,
                'response': 'A user with this email already exists.'
            }
        return {
            'status': 500,
            'response': f'An integrity error occurred: {str(e)}'
        }
    except Exception as e:
        return {
            'status': 500,
            'response': f'An error occurred: {str(e)}'
        }
    finally:
        conn.close()

    return {
        'status': 201,
        'response': 'User created successfully!'
    }


def fetch_all_users():
    # Connect to the SQLite database
    conn = sqlite3.connect(database=DATABASE)
    cursor = conn.cursor()

    try:
        # Fetch the user details from the users table
        cursor.execute('''SELECT * FROM users''')

        # Fetch all records
        users = cursor.fetchall()
    except Exception as e:
        return {
            'status': 500,
            'response': f'An error occurred: {str(e)}'
        }
    finally:
        # Close the connection
        conn.close()

    return {
        'status': 200,
        'response': 'Loading all users!',
        'data': users
    }


def update_user(email, first_name=None, last_name=None):
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect(database=DATABASE)
        cursor = conn.cursor()

        # Update the user details in the users table based on the email
        if first_name and last_name:
            cursor.execute('''
                UPDATE users
                SET first_name = ?, last_name = ?
                WHERE email = ?
            ''', (first_name, last_name, email))
        elif first_name:
            cursor.execute('''
                UPDATE users
                SET first_name = ?
                WHERE email = ?
            ''', (first_name, email))
        elif last_name:
            cursor.execute('''
                UPDATE users
                SET last_name = ?
                WHERE email = ?
            ''', (last_name, email))
    except Exception as e:
        return {
            'status': 500,
            'response': f'An error occurred: {str(e)}'
        }
    finally:
        # Commit the transaction and close the connection
        conn.commit()
        conn.close()

    return {
        'status': 200,
        'response': 'User updated successfully!'
    }


def delete_user(email):
    # Connect to the SQLite database
    conn = sqlite3.connect(database=DATABASE)
    cursor = conn.cursor()

    try:
        # Delete the user from the users table based on the email
        cursor.execute('''
            DELETE FROM users WHERE email = ?
        ''', (email,))
        rows_deleted = cursor.rowcount
        if rows_deleted == 0:
            raise Exception('Record not present.')
    except Exception as e:
        return {
            'status': 500,
            'response':f'An error occurred: {str(e)}'
            }
    finally:
        # Commit the transaction and close the connection
        conn.commit()
        conn.close()
    return {
        'status': 200,
        'response': 'User deleted successfully!'
    }


if __name__ == '__main__':
    print(create_user('John', 'Doe', 'john@doe.com'))
    print(create_user('John', 'Doe', 'john@doe.com'))
    print(create_user('Jane', 'Doe', 'jane@doe.com'))

    print(fetch_all_users())

    print(update_user('jane@doe.com', first_name='Jane', last_name='Smith'))

    print(fetch_all_users())

    print(delete_user('john@doe.com'))

    print(fetch_all_users())