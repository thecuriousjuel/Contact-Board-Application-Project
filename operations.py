"""
This python file contains all the methods for CRUD operations
"""

# Importing the required modules/libraries
import os
import sqlite3

# Defining the database name and its folder
DB_FOLDER = 'database'
DB_NAME = 'users.db'
DATABASE = os.path.join(DB_FOLDER, DB_NAME)

def prepare():
    """
    This method is used to prepare the database environment.
    """
    if not os.path.exists(DB_FOLDER):
        os.makedirs(DB_FOLDER)
    create_table()

def create_table():
    """
    This method is used to create the table.
    """
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
        # Commit the transaction
        conn.commit()
    except Exception as exp:
        print(f"An Error occured {str(exp)}")
    finally:
        conn.close()

def create_user(first_name, last_name, email):
    """
    This method is used to create a new user
    """
    # Connect to the SQLite database (or create it if it doesn't exist)
    conn = sqlite3.connect(database=DATABASE)
    cursor = conn.cursor()

    try:
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
                'response': f"A user with '{email}' already exists."
            }
        print(f'An integrity error occurred while creating the user: {str(e)}')
        return {
            'status': 500,
            'response': f"An error occured while creating the user '{email}'"
        }
    except Exception as e:
        print(f"An error occurred while creating the user '{email}': {str(e)}")
        return {
            'status': 500,
            'response': f"An error occured while creating the user '{email}'"
        }
    finally:
        conn.close()

    return {
        'status': 201,
        'response': f"User '{email}' created successfully!"
    }

def fetch_all_users():
    """
    This method is used to fetch all user details.
    """
    # Connect to the SQLite database
    conn = sqlite3.connect(database=DATABASE)
    cursor = conn.cursor()

    try:
        # Fetch the user details from the users table
        cursor.execute('''SELECT * FROM users''')

        # Fetch all records
        users = cursor.fetchall()
    except Exception as e:
        print(f'An error occurred while fetching the User details: {str(e)}')
        return {
            'status': 500,
            'response': 'An error occurred while fetching the User details',
        }
    finally:
        # Close the connection
        conn.close()

    return {
        'status': 200,
        'response': [list(user) for user in users]
    }

def update_user(email, first_name=None, last_name=None):
    """
    This method is used to update the user details using the email address.
    """
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
        print(f"An error occurred while updating the user '{email}': {str(e)}")
        return {
            'status': 500,
            'response': f"An error occurred while updating the user '{email}'"
        }
    finally:
        # Commit the transaction and close the connection
        conn.commit()
        conn.close()

    return {
        'status': 200,
        'response': f"User '{email}' updated successfully!"
    }

def delete_user(email):
    """
    This method is used to delete a user using the email address.
    """
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
        print(f"An error occurred while deleting the user '{email}': {str(e)}")
        return {
            'status': 500,
            'response': f"An error occurred while deleting the user '{email}'"
        }
    finally:
        # Commit the transaction and close the connection
        conn.commit()
        conn.close()
    return {
        'status': 200,
        'response': f"User '{email}' deleted successfully!"
    }


# This below code was used to test all the above functions.
# To test again, execute this file only.
# $ python operations.py
if __name__ == '__main__':
    print(create_user('John', 'Doe', 'john@doe.com'))
    print(create_user('John', 'Doe', 'john@doe.com'))
    print(create_user('Jane', 'Doe', 'jane@doe.com'))

    print(fetch_all_users())

    print(update_user('jane@doe.com', first_name='Jane', last_name='Smith'))

    print(fetch_all_users())

    print(delete_user('john@doe.com'))

    print(fetch_all_users())
