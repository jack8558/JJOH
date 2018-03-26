def removeNameCommaAndStrip(aList):

    i = 0

    listOfLists = [   ]

    while i < len(aList):

        listLine = aList[i]

        listLine = listLine.strip( ) # still a String

        listLine = listLine.split(',')  # turn into a list

        listLine = listLine[:11] + listLine[12:] #eliminate the column that is the instructor's first initial

        listOfLists.append(listLine)

        i += 1

    return listOfLists

def createMaster(rows) :
    masterList = removeNameCommaAndStrip(rows)
    return masterList

def getCategory( ):
    category = 'x'
    while not (category in ['A','C','D','I','T']):
        print('What would you like to ask about? ')
        print('A  - A of I courses')
        print('C - course number')
        print('D - days')
        print('I  - Instructor')
        print('T - time')
        category = input('----> ').upper( )
    return category

def printOutput(topic, value, allCourseList):
    #first get the column number
    if topic == 'A':       #5
        index = 5
    elif topic == 'C':
        index = 1
    elif topic == 'D':
        index = 7
    elif topic == 'I':
        index = 10
    elif topic == 'T':
        index = 11
    else: # should not happen
        index = 0
#    print('index:',index,'topic',topic,'value',value)
    if value == 'SORTED':
        l = sorted(allCourseList,key=lambda l:l[index])
        for a in l:
            print(a)
        return
    else:
        i=0
        while i < len(allCourseList):
            #print(allCourseList[i][index].upper( ) )
            if value.upper( ) in allCourseList[i][index].upper( ):
                print(allCourseList[i])
            i+=1
              
go = 'Y'
file = open('/Users/drlambert/Dropbox/Classes/cpsc130/ScheduleAllClasses.csv')
                #ScheduleAllClasses.csv') # all classes
        #ScheduleOfClassessp15.csv) # just CS classes
rows = file.readlines( )
rows = rows[1:]
allCourseList = createMaster(rows)
while go == 'Y':
    topic = getCategory( )
    print('Enter the value that you want to find within this category (enter sorted to sort)-->',end='')
    value = input( ).upper( )
    printOutput(topic, value, allCourseList)
    go = input('Do you want to continue (Y/N)--> ').upper( )

    
    
