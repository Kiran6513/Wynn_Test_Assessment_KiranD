import { expect } from '@playwright/test';
import { BasePage } from '../../Utils/BasePage';
import path from 'path';
import fs from 'fs';

export class UploadPage extends BasePage {

  private readonly uploadPageHeader = this.page.locator('//h3');
  private readonly choseFile = this.page.locator('#file-upload');
  private readonly uploadButton = this.page.getByRole('button', { name: 'Upload' });
  private readonly fileUPloadedMessage = this.page.getByRole('heading', { name: 'File Uploaded!' });
  private readonly blankFileUpload = this.page.locator("//h1");
  private readonly dropZone = this.page.locator('#drop-zone');

  async verifyPageHeader(){
    const message = await this.uploadPageHeader.textContent();
    expect(message).toBe('File Uploader')
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async clickLoginButton() {
    await this.page.click('text=Login');
  }

  async uploadFile(fileName: string){
    if(fileName.length!=0){
    const filePath = path.resolve(__dirname, '..', '..', '..','testData', fileName);
    await this.page.getByRole('button', { name: 'Choose File' }).setInputFiles(filePath);
    }    
    await this.uploadButton.click();
  }

  async fileUploadedSuccessMessage(successMessage:string){
    expect(await this.fileUPloadedMessage.textContent()).toBe(successMessage)

  }

  async verifyFileUploaded(FileName:string){
    // expect( this.page.getByText(FileName)).toBeVisible({timeout: 4000});
  }
  async userClickOnUploadButton(){
    await this.uploadButton.click();
  }

  async verifyErrorMessage(){
      const message = await this.blankFileUpload.textContent();
      expect(message).toBe('Internal Server Error')
  }

  /**
 * Step: the user uploads files via drag and drop to the dropzone 
 * Description:
 *   Simulates a file drag-and-drop upload to the specified dropzone element.
 *   Uses Playwright's  drag events 
 *
 * @param fileName - Name of the file in your local test assets directory 
 * @param dropZoneSelector - CSS selector for the drop area element 
 */
  async uploadFileDragAndDrop(file: string){
    if(file.length!=0){
      const dropZoneSelector = '#drag-drop-upload';
      const filePath = path.resolve(__dirname, '..', '..', '..','testData', file);
      const fileName = path.basename(filePath);
      const fileBuffer = fs.readFileSync(filePath);
      const fileArray = Array.from(fileBuffer);
      await this.page.$eval(dropZoneSelector,(dropZone, args) => {
          // const [fileName, fileArray] = args;
          const fileName = args[0] as string;
          const fileArray = args[1] as number[];
          const dataTransfer = new DataTransfer();
          // const file = new File([new Uint8Array(fileArray)], fileName);
          const file = new File([new Uint8Array(fileArray as number[])], fileName);
          dataTransfer.items.add(file);
      
          dropZone.dispatchEvent(new DragEvent('dragenter', { bubbles: true, cancelable: true, dataTransfer }));
          dropZone.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer }));
        },
        [fileName, fileArray] // pass as single argument (array) here
      )};
      await this.uploadButton.click();
    }
  }  
