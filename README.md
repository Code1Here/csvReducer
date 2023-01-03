# csvReducer

This console application expects a path to the .csv file as a command line arguement. The csv file will be parsed using the *csv-parse* package to create objects. If 
that object's *id* exists within the map, a function to update the map will trigger; else, a new key-value pair will be set. The result is a map whose contents are 
a collection of Customer objects. After the CSV file is parsed, each Customer object will have all its transactions (of a given period of time) reduced to its 
minimum, maximum & ending balance.

Execution of the file prints the contents of the map to the console in *like so*:

![Screenshot (542)](https://user-images.githubusercontent.com/87147191/210291506-d585869b-28f5-410b-be7c-fc0c244b03f8.jpg)
