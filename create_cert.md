openssl req \
  -config openssl.conf \
  -new -x509 -sha256 \
  -newkey rsa:2048 \
  -nodes \
  -days 1000 \
  -keyout localhost.key.pem \
  -out localhost.cert.pem