The objective we have at hand is to prepare a level mix summary by client file. This is done every month. We're preparing the file for March '26 now.

For the March '26 run, there are four operational workbooks involved in the processing flow:
- FinOps Staffing Sheet 2026
- Employee Roster March 26
- Roster Mapping for Group Lead
- YTD March 26 P&L

In addition to the four operational workbooks above, the previous month's Level Mix Summary by Client workbook is also required as a reference source for carrying forward prior-month level values.

The input file Employee Roster March 26 is used on another input file, Roster Mapping for Group Lead, to generate data, and finally, the updated data in Roster Mapping for Group Lead Excel file is used by the output file.

### **Step 1: FinOps Staffing Sheet**
The first step we can take up is FinOps Staffing Sheet 2026 input file. From the TA Known Joiners, TA Open Positions, BP Exits tabs, we need to filter out Period for 2026. In the TA Known Joiners tab, another filter is to have Status as anything other than "Offer Declined." We bring this data from the three tabs—TA Known Joiners, TA Open Positions, and BP Exits—into the output file's SS Data tab. Columns that are necessary should only be pasted into the output file.

### **Step 2: YTD March 26 P&L**
The second input file to be considered is YTD March 26 P&L. From the tab FTE Cost in this input file, apply the condition of having Department equal to FinOps and copy all the relevant data into the output file's CMP H by Client tab between columns AT to DK.

### **Step 3: Roster Mapping & Employee Roster**
Third step is to bring in the data from one of the input files, which is Employee Roster March 26, into another input file, which is Roster Mapping for Group Lead. In the Employee Roster March 26 Excel workbook, pick data from the tab Roster Format. The conditions are Primary Department should be Financial Operations, and Location should be BLR, GGM, HYD.

Another catch here is we have text in red color at the bottom of the sheet of Roster Format—that's the data of exits—so ensure that a copy of these exits data is saved in the Roster Mapping for Group Lead file in the yellow highlighted section on the top, which starts from Row 5 and currently goes until Row 389. The key intention is that the existing exits data in that yellow highlighted section should not be overwritten. Any additional exit rows should be appended after the currently populated exit rows in that processing area, even if the section needs to expand beyond the current extent.

Rest of the data from the Roster Format sheet of the Employee Roster tab has to go into the Roster Mapping for Group Lead file's Roster sheet after the exits section. Once the exit rows are appended in the yellow highlighted processing area, leave four to five blank rows and then paste the rest of the roster data into the Roster sheet. Column N is formula-based in the Roster Mapping for Group Lead file; it should not be overwritten—it has to be calculated.

### **Step 4: FTE Allocations & Level Updates**
The next step is to consider data from YTD March P&L Excel workbook's FTE Allocations tab. Filter should be Department equal to Financial Operations or FinOps. Consider all the data in that tab and then use it in the output file's FTE Data tab.

In the FTE Data tab of the output file, between columns Z and AK, we have column names such as Level Jan, Level Feb, Level March, etc., until Level December. When we are working on the Level Mix file for March, we need to ensure that the Level Jan and Level Feb data are the same as what was considered in the previous month. So another step here is to populate Level Jan and Level Feb from the previous month's Level Mix Summary by Client Excel workbook.

For the current month, which is March in this run, the Level March value has to be updated from the current Employee Roster March 26 Excel workbook. This should be matched based on Login. Use the level-related data from the Employee Roster Excel workbook, but keep only the suffix-style level value such as L1, L2, Intern, Contractor, etc. Ignore the number portion such as 701 that appears in the source column.

So once the data is taken from the YTD March P&L's FTE Allocations tab and put in the FTE Data, and the required level columns are updated, the next step is to update the FinOp Cube Group Lead column in the FTE Data tab of the output file, which is in Column I. The FinOp Group Lead data has to be taken from the Roster Mapping for Group Lead file's Roster tab that we just updated. It can be taken based on the column Login. Every Login has an associated Group Lead to it. For example, in the Roster Mapping for Group Lead file's Roster tab, the Login is in Column G and the Group Lead is in Column N. So this has to be fetched from the Roster Mapping for Group Lead file into the output file's FTE Data tab under Column I.

### **Final Constraints**
Do not overwrite the pivot tables or formulae that are updated in the other sheets of the output file. Any changes to be done have to be done only in the FTE Data, SS Data, and CMP H by Client tabs. In the CMP H by Client tab, data to be touched should be only between columns AT and DK. Nothing else should be touched.
