// BS"D
// All rights reserved (c) 2015 by Id-Extras.com
// Free to use and modify but do not delete this copyright attribution.
// This script will export 2 pdfs of the current document
// Choose the PDF presets by altering their names below
// The second PDF gets a suffix added to its name.
// Modify the line below beginning name2 = to change the suffix.
// For more InDesign scripts: www.Id-Extras.com

d = app.activeDocument;
// Here you can choose the PDF preset
preset1 = app.pdfExportPresets.itemByName("[Smallest File Size]");
preset2 = app.pdfExportPresets.itemByName("PDF X-1a 2001 Custom");
partnum = app.activeDocument.textVariables.item("Part Number").variableOptions
  .contents;
bulletinnum = app.activeDocument.textVariables.item("Bulletin Number")
  .variableOptions.contents;

if (!(partnum || bulletinnum)) {
  alert(
    "There's no Part Number or Bulletin Number text variable defined. You'll need both to properly output the filenames."
  );
  exit;
}
if (!(preset1.isValid && preset2.isValid)) {
  alert("One of the presets does not exist. Please check spelling carefully.");
  exit();
}
if (d.saved) {
  thePath = String(partnum).replace(/\..+$/, "") + ".pdf";
  thePath = String(new File(thePath).saveDlg());
} else {
  thePath = String(new File().saveDlg());
}
thePath = thePath.replace(/\.pdf$/, "");
name1 = thePath + ".pdf";
// Here you can set the suffix at the end of the name
name2 = thePath + "_" + bulletinnum + ".pdf";
d.exportFile(ExportFormat.PDF_TYPE, new File(name1), false, preset1);
d.exportFile(ExportFormat.PDF_TYPE, new File(name2), false, preset2);
