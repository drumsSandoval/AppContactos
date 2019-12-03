from flask import Flask, jsonify,request
import mysql.connector

app = Flask(__name__)

bd = mysql.connector.connect(
    host='byae15xzajlubktswvtv-mysql.services.clever-cloud.com', user='uhqfu1aqx6tisfyw',
    passwd='ZAwgOiMwCZEzSmzLGDc9', database = 'byae15xzajlubktswvtv',
    auth_plugin='mysql_native_password'
)

cursor = bd.cursor()

@app.route('/users/',methods=['GET','POST'])
def Users():
    if request.method == "GET":
        users = []
        query = "SELECT * FROM users"
        cursor.execute(query)
        for user in cursor.fetchall():
            u = {
                'id': user[0],
                'email': user[1],
                'password': user[2]
            }
            users.append(u)
        print(users)
        return jsonify(users)
    else:

        data = request.get_json()
        print(data)

        query = "INSERT INTO users(email,password) VALUES  (%s,%s)"
        cursor.execute(query, (data['email'],data['password']))
        bd.commit()
        if cursor.rowcount:
            return jsonify({'data': 'Ok'})
        else:
            return jsonify({'data': 'error'})


@app.route('/contacts/',methods=['GET','POST'])
def Contacts():
    if request.method == "GET":
        contacts = []
        query = "SELECT * FROM contacts"
        cursor.execute(query)
        for contact in cursor.fetchall():
            c = {
                'id': contact[0],
                'name': contact[1],
                'email': contact[2],
                'facebook': contact[3],
                'image': contact[4],
                'twitter': contact[5],
                'instagram': contact[6],
                'phone': contact[7],
                'user_id': contact[8],
            }
            contacts.append(c)
        print(contacts)
        return jsonify(contacts)
    else:
        data = request.get_json()
        print(data)
        query = "INSERT INTO contacts(name,email,facebook,image,twitter,instagram,phone,user_id) VALUES  (%s,%s,%s,%s,%s,%s,%s,%s)"
        cursor.execute(query, (data['name'],data['email'],data['facebook'],data['image'],data['twitter'],data['instagram'],data['phone'],data['user_id']))
        bd.commit()
        if cursor.rowcount:
            return jsonify({'data': 'Ok'})
        else:
            return jsonify({'data': 'error'})

@app.route('/delete/',methods=['POST'])
def Delete():
    data = request.get_json()
    print(data)
    print('Usuario id = ',data['id'])
    query = "DELETE FROM contacts WHERE id = %s"
    cursor.execute(query,(data['id'],))
    bd.commit()
    return jsonify({'data': 'Ok'})



app.run(debug=True)