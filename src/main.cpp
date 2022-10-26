// INCLUIR BIBLIOTECAS
#include <Arduino.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SPI.h>

// PINOS
#define SS_PIN 5                    //--> PINOS PARA O RFID
#define RST_PIN 27                  //--> PINOS PARA O RFID
#define buzzer 13                   //--> PINO DO BUZZER
#define LED_INTER 2                 //--> PINO PARA O LED INTERNO
#define LED_VERMELHO 32             //--> PINO PARA O LED VERMELHO
#define LED_VERDE 26                //--> PINO PARA O LED VERDE
#define BUTT_VERM 15                //--> PINO BOTÃO VERMELHO
#define BUTT_AZUL 27                //--> PINO BOTÃO AZUL
MFRC522 mfrc522(SS_PIN, RST_PIN);   //--> CRIAR INSTANCIA PARA MODULO RFID.
LiquidCrystal_I2C lcd(0x27, 16, 2); //--> Inicia o LCD
WiFiServer server(80);              //--> PORTA DO SERVIDOR

// VARIAVEIS
const char *ssid = "ETEC de Lins";
const char *password = "";

int readsuccess;
byte readcard[4];
char str[32] = "";
String StrUID;
String payload;
bool btVermelho;
bool btAzul;
String IP = "192.168.11.143";
bool modo;

// TRANSFORMA A UID DO CARTÃO EM STRING LEGIVEL
void ArrayPraSting(byte array[], unsigned int len, char buffer[])
{
  for (unsigned int i = 0; i < len; i++)
  {
    byte nib1 = (array[i] >> 4) & 0x0F;
    byte nib2 = (array[i] >> 0) & 0x0F;
    buffer[i * 2 + 0] = nib1 < 0xA ? '0' + nib1 : 'A' + nib1 - 0xA;
    buffer[i * 2 + 1] = nib2 < 0xA ? '0' + nib2 : 'A' + nib2 - 0xA;
  }
  buffer[len * 2] = '\0';
}

// LÊ E VERIRICA SE O CARTÃO ESTÁ PRESENTE
int getid()
{
  if (!mfrc522.PICC_IsNewCardPresent())
  {
    return 0;
  }
  if (!mfrc522.PICC_ReadCardSerial())
  {
    return 0;
  }

  Serial.print("O UID DO CARTÃO É: ");

  for (int i = 0; i < 4; i++)
  {
    readcard[i] = mfrc522.uid.uidByte[i];
    ArrayPraSting(readcard, 4, str);
    StrUID = str;
  }
  mfrc522.PICC_HaltA();
  return 1;
}

// LCD
void InserirLCD(String info, String info2, int temp)
{
  lcd.setCursor(0, 0);
  lcd.print(info);
  lcd.setCursor(0, 1);
  lcd.print(info2);
  delay(temp);
  lcd.clear();
}

// BUZZER
void apito(int tempo)
{
  ledcWriteTone(0, 700); // ACIONA O BUZZER
  delay(tempo);
  ledcWriteTone(0, 0); // DESATIVA O BUZZER
}

// WIFI
void conectWifi()
{
  Serial.print("Conectando");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    digitalWrite(LED_INTER, LOW);
    delay(250);
    digitalWrite(LED_INTER, HIGH);
    delay(250);
  }

  digitalWrite(LED_INTER, HIGH);
  Serial.println("");
  Serial.print("Conectado a : ");
  Serial.println(ssid);
  Serial.print("Endereço de IP: ");
  Serial.println(WiFi.localIP());
  apito(500);
  Serial.print('\n');
}

// SETUP
void setup()
{
  Serial.begin(9600);
  SPI.begin();
  mfrc522.PCD_Init();
  lcd.init();               //--> Inicia o LCD
  lcd.backlight();          //--> Inicia o Backlight do LCD
  ledcAttachPin(buzzer, 0); //--> INICIALIZA O BUZZER
  pinMode(LED_INTER, OUTPUT);
  pinMode(LED_VERMELHO, OUTPUT);
  pinMode(LED_VERDE, OUTPUT);
  pinMode(BUTT_VERM, INPUT_PULLUP);
  pinMode(BUTT_AZUL, INPUT_PULLUP);

  WiFi.begin(ssid, password); //--> nem precisa falar oq isso faz né?
  conectWifi();

  server.begin(); //--> INICIAR SERVIDOR HTTP
  lcd.setCursor(0, 0);
  lcd.print("SELECIONE:");
  lcd.setCursor(0, 1);
  lcd.print("ADICIONAR | LER");
  Serial.print("MODO:");

  while (true)
  {
    btVermelho = digitalRead(BUTT_VERM);
    btAzul = digitalRead(BUTT_AZUL);

    if (btVermelho == true && btAzul == false)
    {
      lcd.clear();
      Serial.print(" LER! \n");
      InserirLCD("MODO SELECIONAD:", "LER", 2500);
      modo = true;
      break;
    }
    else if (btAzul == true && btVermelho == false)
    {
      lcd.clear();
      Serial.print(" ADICIONAR! \n");
      InserirLCD("MODO SELECIONAD:", "ADICIONAR", 2500);
      modo = false;
      break;
    }
  }
}

// LOOP
void loop()
{
  digitalWrite(LED_VERMELHO, HIGH);
  digitalWrite(LED_INTER, HIGH);

  readsuccess = getid();
  //--> LER O CARTÃO
  if (modo == true)
  {
    if (readsuccess)
    {
      digitalWrite(LED_INTER, LOW);

      String UIDresultSend, postData;
      UIDresultSend = StrUID;

      Serial.println(UIDresultSend);
      InserirLCD("UID:", UIDresultSend, 3000);

      HTTPClient http;
      http.begin("http://" + IP + "/read.php?UID=" + UIDresultSend); //
      Serial.println("http://" + IP + "/read.php?UID=" + UIDresultSend);
      int httpCode = http.GET();

      // SE RECEBER RESPOSTA DO SERVIDOR HTTP
      if (httpCode > 0)
      {
        // SE DER CERTO
        if (httpCode == HTTP_CODE_OK)
        {
          payload = http.getString();
          Serial.println(payload);
          if (payload == "negado")
          {
            InserirLCD(" ERRO:", "NENHUMA PASS.", 2000);
            apito(150);
          }
          else
          {
            InserirLCD("N. DE PASSAGENS:", payload, 1500);
            digitalWrite(LED_VERDE, HIGH);
            digitalWrite(LED_VERMELHO, LOW);
            apito(1500);
            digitalWrite(LED_VERDE, LOW);
            digitalWrite(LED_VERMELHO, HIGH);
          }
        }
        else
        {
          // erro HTTP
          Serial.printf("[HTTP] GET... ERRO: %d\n", httpCode);
        }
      }
      else
      {
        // erro HTTP
        Serial.printf("[HTTP] GET... falhou. ERRO: %s\n", http.errorToString(httpCode).c_str());
      }
      http.end();
    }
  }
  else
  {
    //--> ADICIONAR CARTÃO AO BANCO DE DADOS
    if (readsuccess)
    {
      digitalWrite(LED_INTER, LOW);

      String UIDresultSend, postData;
      UIDresultSend = StrUID;

      Serial.println(UIDresultSend);
      InserirLCD("UID:", UIDresultSend, 3000);

      HTTPClient http;
      http.begin("http://" + IP + "/add.php?UID=" + UIDresultSend); //
      Serial.println("http://" + IP + "/add.php?UID=" + UIDresultSend);
      int httpCode = http.GET();

      // SE RECEBER RESPOSTA DO SERVIDOR HTTP
      if (httpCode > 0)
      {
        // SE DER CERTO
        if (httpCode == HTTP_CODE_OK)
        {
          payload = http.getString();
          Serial.println(payload);
          if (payload == "CAD")
          {
            InserirLCD("ESTADO:", "CADASTRADO", 2000);
            digitalWrite(LED_VERDE, HIGH);
            digitalWrite(LED_VERMELHO, LOW);
            delay(500);
            digitalWrite(LED_VERDE, LOW);
          }
          else
          {
            InserirLCD("ESTADO:", "JA CADASTRADO", 2000);
            apito(500);
          }
        }
        else
        {
          // erro HTTP
          Serial.printf("[HTTP] GET... ERRO: %d\n", httpCode);
        }
      }
      else
      {
        // erro HTTP
        Serial.printf("[HTTP] GET... falhou. ERRO: %s\n", http.errorToString(httpCode).c_str());
      }
      http.end();
    }

    delay(500);
    digitalWrite(LED_INTER, LOW);
  }
}
