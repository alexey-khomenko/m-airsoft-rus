import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

// Получаем путь к текущей директории для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Map со строками для замены
const strings = new Map();

strings.set('"/cart"', '"/m-airsoft-rus/cart.html"');
strings.set('"/catalog"', '"/m-airsoft-rus/catalog.html"');
strings.set('"/favourite"', '"/m-airsoft-rus/favourite.html"');
strings.set('"/index"', '"/m-airsoft-rus/index.html"');
strings.set('"/profile"', '"/m-airsoft-rus/profile.html"');

// Функция для получения HTML-файлов только в указанной директории (без рекурсии)
function getHtmlFiles(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    return files
      .filter(file => file.endsWith('.html'))
      .map(file => path.join(dirPath, file));
  }
  catch (error) {
    console.error(`Ошибка при чтении директории ${dirPath}:`, error);
    return [];
  }
}

// Функция для замены строк в файле
function replaceStringsInFile(filePath) {
  try {
    // Читаем содержимое файла
    let content = fs.readFileSync(filePath, 'utf8');

    // Сохраняем исходное содержимое для сравнения
    const originalContent = content;

    // Проходим по всем парам ключ-значение в Map и делаем замены
    for (const [key, value] of strings.entries()) {
      // Используем регулярное выражение для замены всех вхождений
      const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(regex, value);
    }

    // Если были сделаны замены, записываем обновленное содержимое обратно в файл
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Обновлен файл: ${filePath}`);
      return true;
    }

    return false;
  }
  catch (error) {
    console.error(`Ошибка при обработке файла ${filePath}:`, error);
    return false;
  }
}

// Основная функция
function main() {
  try {
    const docsPath = path.join(__dirname, 'docs');
    const htmlFiles = getHtmlFiles(docsPath);

    console.log('Найденные HTML-файлы:');
    htmlFiles.forEach(file => console.log(file));

    console.log('\nНачинаем замену строк...');
    let modifiedFilesCount = 0;

    htmlFiles.forEach(file => {
      if (replaceStringsInFile(file)) {
        modifiedFilesCount++;
      }
    });

    console.log(`\nЗавершено. Обработано файлов: ${htmlFiles.length}, изменено: ${modifiedFilesCount}`);
  }
  catch (error) {
    console.error('Ошибка при сканировании HTML-файлов:', error);
  }
}

// Запускаем основную функцию
main();
