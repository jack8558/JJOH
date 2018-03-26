#Geojson converter 2
import csv
# Read in raw data from csv
rawData = csv.reader(open('Acordada_Db_JJOH.csv', 'r'), dialect='excel')
# the template. where data from the csv will be formatted to geojson
template = \
    ''' \
    { "type" : "Feature",
        "geometry" : {
            "type" : "Point",
            "coordinates" : [%s, %s]},
        "properties" : { "caseNo" : %s, "year" : "%s", "individual" : "%s", "punishment": "%s", "crime": "%s"}
        },
    '''
# the head of the geojson file
output = \
    ''' \
{ "type" : "Feature Collection",
    "features" : [
    '''
# loop through the csv by row skipping the first
iter = 0
for row in rawData:
    iter += 1
    if iter >= 6:
        caseNo = row[2]
        year = row[1]
        lat = row[12]
        lon = row[11]
        individual = row[4]
        crime = row[5]
        punishment = row[6]
        # output += template % (row[0], row[2], row[1], row[3], row[4])
        output += template % (lon, lat,  caseNo,  year, individual, punishment, crime)
    
# the tail of the geojson file
output += \
    ''' \
    ]
}
    '''
    
# opens an geoJSON file to write the output to
outFileHandle = open("Acordada.geojson", "w")
outFileHandle.write(output)
outFileHandle.close()
