This extension adds a button to the top right bar (next to chat & participant list) to enable grid-view in Google Meets. Grid view gives every participant an equal sized video for use in meetings without a primary speaker (such as working from home silent meetings).

This extension forcibly loads every participant's video when grid view is enabled and may cause performance issues in extremely large meetings.

Includes a variety of options to enhance your meeting: include your own video, highlight who is speaking, and hide participants without video!

## Official Releases

[Chrome Extension](https://chrome.google.com/webstore/detail/kklailfgofogmmdlhgmjgenehkjoioip)

[Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/google-meet-gridview)

[Microsoft Edge Extension](https://microsoftedge.microsoft.com/addons/detail/ogbbehbkcmdciebilbkpjgopohnpfolj)

[Userscript](https://greasyfork.org/en/scripts/397862-google-meet-grid-view)
 - **Chrome and Firefox supported.** Every update is tested on both Chrome and Firefox before release.
 - **TamperMonkey, GreaseMonkey, and ViolentMonkey supported.** All these extensions have been tested and verified working on Chrome & Firefox.
 - Chromium browsers *may* work. They are not explicitly tested, but probably work. Please file an issue with your browser & userscript extension if you encounter issues.
 - **Safari does NOT work!** Safari does not respect the Content-Security-Policy spec in regards to extensions, so Tampermonkey can not inject scripts into Google Meets ([citation](https://github.com/Tampermonkey/tampermonkey/issues/296#issuecomment-222356524)). There is nothing I can do about this, please do not try to use the script on Safari.

## Privacy Policy

This extension does not track any user data.  
There is no detailed privacy policy as there is nothing to explain.  
Your data can not be stored, as it does not exist.   
Your data can not be shared, as it does not exist.   
Your data can not be sold, as it does not exist.  

If this is insufficient please email fugiman47+grid-view-extension@gmail.com . Please note that I do not have a scanner and therefore can't sign physical documents.

## License

### Legal Version

Copyright Chris Gamble - All Rights Reserved

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Not Legal Version

The intent of this repository is to allow easy auditing of the source code for my user script and extensions. It has the secondary benefit of easily allowing users to file issues or submit translations.

You are allowed to:
 - download and use this code for personal use, preferably via the official releases above
 - use administrative features of extension stores to install the official releases above to your entire organization
   - For example, you may use GSuite Admin to install the Grid View Chrome Extension to your entire school
 - modify this code for personal use
 - submit modifications via Pull Request, accepting that you transfer copyright of your modification to Chris Gamble when you do so

You are not allowed to:
 - distribute this code or any modifications to this code in any manner
 - sell this code or any modifications to this code in any manner
 - sublicense this code or any modifications to this code in any manner
 - sue or otherwise hold liable Chris Gamble

If you are looking for a more permissive license please email fugiman47+grid-view-extension@gmail.com
