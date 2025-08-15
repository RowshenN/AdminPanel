server {
listen 3000;
listen [::]:3000;
root /home/tanat/admin/build;
location / {
try_files $uri /index.html;
}
}
