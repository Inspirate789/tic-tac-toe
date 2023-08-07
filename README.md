# tic-tac-toe

### Development build:
```bash
sudo docker build -f dev.Dockerfile -t tic-tac-toe-dev .
sudo docker run -d -v .:/react-app -p 3000:3000 --name tic-tac-toe-dev tic-tac-toe-dev
```
See http://localhost:3000/

### Production build:
```bash
sudo docker build -f prod.Dockerfile -t tic-tac-toe-prod .
sudo docker run -d -p 3000:80 --name tic-tac-toe-prod tic-tac-toe-prod
```
See http://localhost:3000/
